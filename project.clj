(defproject todo-queue "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.3.1"]
                 [ring/ring-defaults "0.1.2"]
                 [ring/ring-jetty-adapter "1.4.0"]
                 [environ "1.0.0"]
                 [crypto-password "0.1.3"]
                 [org.clojure/java.jdbc "0.3.5"]
                 [postgresql "9.1-901-1.jdbc4"]
                 [org.clojure/data.json "0.2.6"]]
  :plugins [[lein-ring "0.8.13"]]
  :ring {:handler todo-queue.handler/app}
  :uberjar-name "todo-queue-standalone.jar"
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
