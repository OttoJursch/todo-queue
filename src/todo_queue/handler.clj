(ns todo-queue.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.util.response :as response]
            [crypto.password.scrypt :as pw]
            [clojure.java.jdbc :as db]
            [clojure.data.json :as json]
            [environ.core :refer [env]]
            [clojure.string :as st]))


(defn account-found [id]
  (-> 
     (db/query (env :database-url "postgres//localhost:5432") ["SELECT resources, tasks FROM todo_queue_users WHERE email =?" id])
     (json/write-str)
     (response/redirect))
)

(defn password-check [[id password]]
  (println "Posting up " id " " password)
  ;; Via sql get password for provided id
  ;;(if (= (password/decrypt from-sql) password)
  (if (= password (pw/check (get (db/query ["SELECT password FROM todo_queue_users WHERE email = ?" id]) :password)))
    (account-found id);; (response/redirect "password-is-good")
  (response/redirect "Error"))
  ;;(response/redirect "bad username or password"))
)

(defn account-create-success [id password]
  (db/insert! (env :database-url "postgres://localhost:5432") :todo_queue_users {:email id :password (pw/encrypt password)})
  (account-found id)
)

(defn create-account [[id password]]
  ;First check if email account already exists
  ;If it doesn't, pass (password/encrypt password) and email to sql database
  (if (not= "()" (str (db/query (env :database-url "postgres://localhost:5432") ["SELECT email FROM todo_queue_users WHERE email = ?" id])))
    (account-create-success id password)     
  (response/redirect "Error"))
) 

(defn destructure-param [query]
  (-> (get query :param) (st/split #" "))
)

(defroutes app-routes
  (GET "/" [] (response/redirect "index.html"))
  (GET "/login" [& query] (password-check (destructure-param query)))
  (GET "/signup" [& query] (create-account (destructure-param query)))
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
