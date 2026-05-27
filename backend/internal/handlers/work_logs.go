package handlers

import (
	"net/http"
	"work-journal/backend/internal/database"
	"work-journal/backend/internal/models"

	"github.com/gin-gonic/gin"
)

type WorkLogInput struct {
	Date       string `json:"date" binding:"required"`
	WorkTypeID uint   `json:"work_type_id" binding:"required"`
	Volume     float64
	Unit       string `json:"unit" binding:"required"`
	Executor   string `json:"executor" binding:"required"`
}

func GetWorkLogs(c *gin.Context) {
	var logs []models.WorkLog

	query := database.DB.Preload("WorkType")

	if dateFrom := c.Query("date_from"); dateFrom != "" {
		query = query.Where("date >= ?", dateFrom)
	}
	if dateTo := c.Query("date_to"); dateTo != "" {
		query = query.Where("date <= ?", dateTo)
	}

	order := "asc"
	if c.Query("order") == "desc" {
		order = "desc"
	}
	query = query.Order("date " + order)

	if err := query.Find(&logs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch work logs"})
		return
	}

	c.JSON(http.StatusOK, logs)
}
