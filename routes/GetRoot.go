package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRoot() gin.HandlerFunc {

	fn := func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
		return
	}

	return gin.HandlerFunc(fn)
}
