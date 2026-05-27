package router

import (
	"net/http"
	"work-journal/backend/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	api := r.Group("/api")
	{
		api.GET("/health", healthHandler)
		api.GET("/work-types", handlers.GetWorkTypes)
		api.GET("/logs", handlers.GetWorkLogs)
		api.POST("/logs", handlers.CreateWorkLog)
	}

	return r
}

func healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
