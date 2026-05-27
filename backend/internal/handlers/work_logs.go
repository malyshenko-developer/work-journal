package handlers

import (
	"net/http"
	"time"
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

func CreateWorkLog(c *gin.Context) {
	var input WorkLogInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	date, err := time.Parse("2006-01-02", input.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format, expected YYYY-MM-DD"})
		return
	}

	workLog := models.WorkLog{
		Date:       date,
		WorkTypeID: input.WorkTypeID,
		Volume:     input.Volume,
		Unit:       input.Unit,
		Executor:   input.Executor,
	}

	if err := database.DB.Create(&workLog).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create work log"})
		return
	}

	database.DB.Preload("WorkType").First(&workLog, workLog.ID)

	c.JSON(http.StatusCreated, workLog)
}
