(ns todo-queue.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.util.response :as response]
            [crypto.password.scrypt :as pw]
            [clojure.java.jdbc :as db]
            [clojure.data.json :as json]
            [environ.core :refer [env]]))

(defn password-check [id password]
  (println "Posting up " id " " password)
  ;; Via sql get password for provided id
  ;;(if (= (password/decrypt from-sql) password)
  (if (= password (pw/check (get (db/query ["SELECT password FROM todo_queue_users WHERE email = ?" id]) :password)))
    (response/redirect "password-is-good")
  (response/redirect "Incorrect username or password"))
  ;;(response/redirect "bad username or password"))
)

(defn account-create-success [id password]
  (db/insert! (env :database-url "postgres://localhost:5432") :todo_queue_users {:email id :password (pw/encrypt password)})
  (response/redirect "password-is-good")
)

(defn create-account [id password]
  ;First check if email account already exists
  ;If it doesn't, pass (password/encrypt password) and email to sql database
  (println (db/query (env :database-url "postgres//localhost:5432") ["SELECT email FROM todo_queue_users WHERE email = ?" id]))
  ;;(if (= "" (get (db/query ["SELECT email FROM todo_queue_users WHERE email = ?" id]) :email))
  ;;(account-create-success id password)     
  ;;(response/redirect "Account Already Exists"))
) 

(defroutes app-routes
  (GET "/" [] (response/redirect "index.html"))
  (GET "/login/:id/:password" [id password] (password-check id password))
  (GET "/signup/:id:password" [id password] (create-account id password))
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
