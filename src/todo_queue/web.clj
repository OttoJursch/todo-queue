(ns todo-queue.web
  (:require [compojure.core :refer  [defroutes GET PUT POST DELETE ANY]]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [clojure.java.io :as io]
            [rind.adapter.jetty :as jetty]
            [environ.core :refer [env]]
            [todo-queue.handler :as handler]))

(defn -main [& [port]]
  (let [port (Integer. (or port (env :port) 5000))]
    (jetty/run-jetty (site #'handler/app-routes) {:port port :join? false}))) 
