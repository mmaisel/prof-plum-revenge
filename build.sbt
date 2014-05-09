name := "clueless"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  "com.googlecode.json-simple" % "json-simple" % "1.1",
  "org.apache.commons" % "commons-pool2" % "2.0",
  "com.typesafe" %% "play-plugins-redis" % "2.1.1"
)

resolvers += "Sedis repository" at "http://pk11-scratch.googlecode.com/svn/trunk/"


play.Project.playJavaSettings
