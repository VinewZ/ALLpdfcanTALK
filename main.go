package main

import (
	"github.com/gin-gonic/gin"
	"github.com/vinewz/ALLpdfcanTALK/routes"
)

func main() {
	r := gin.Default()
  r.LoadHTMLGlob("./static/html/*.html")
  r.Static("/static", "./static")

	r.GET("/", routes.GetRoot())
  r.POST("/api/upload", routes.PostUpload())

	r.Run()
}
