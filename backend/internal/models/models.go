package models

import "time"

type WorkType struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `gorm:"not null;unique" json:"name"`
}

type WorkLog struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Date       time.Time `gorm:"not null" json:"date"`
	WorkTypeID uint      `gorm:"not null" json:"work_type_id"`
	WorkType   WorkType  `gorm:"foreignKey:WorkTypeID" json:"work_type"`
	Volume     float64   `gorm:"not null" json:"volume"`
	Unit       string    `gorm:"not null" json:"unit"`
	Executor   string    `gorm:"not null" json:"executor"`
	CreatedAt  time.Time `json:"created_at"`
}
