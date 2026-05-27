package main

import (
	"log"
	"work-journal/backend/internal/database"
	"work-journal/backend/internal/router"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables.")
	}

	database.Connect()
	database.RunMigrations()

	r := router.Setup()

	log.Println("Starting server on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
