(ns todo-queue.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.util.response :as response]
            [crypto.password.scrypt :as password]))

(defn password-check [id password]
  (println "Posting up " id " " password)
  (password/encrypt password)
)

(defroutes app-routes
  (GET "/" [] (response/redirect "index.html"))
  (POST "login/:id:password" [id password] (password-check id password))
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
