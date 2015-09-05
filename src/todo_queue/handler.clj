(ns todo-queue.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.util.response :as response]
            [crypto.password.scrypt :as password]))

(defn password-check [id password]
  (println "Posting up " id " " password)
  ;; Via sql get password for provided id
  ;;(if (= (password/decrypt from-sql) password)
  (response/redirect "")
  ;;(response/redirect "bad username or password"))
)

(defn create-account [id password]
  ;First check if email account already exists
  ;If it doesn't, pass (password/encrypt password) and email to sql database
  (response/redirect "/home.html")
) 

(defroutes app-routes
  (GET "/" [] (response/redirect "index.html"))
  (GET "/login/:id/:password" [id password] "sword-is-good");(password-check id password))
  (GET "/signup/:id/:password" [id password] (create-account id password))
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
