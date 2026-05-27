package handlers

import (
	"net/http"
	"work-journal/backend/internal/database"
	"work-journal/backend/internal/models"

	"github.com/gin-gonic/gin"
)

func GetWorkTypes(c *gin.Context) {
	var workTypes []models.WorkType
	if err := database.DB.Find(&workTypes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch work types"})
		return
	}

	c.JSON(http.StatusOK, workTypes)
}
