package routes

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func PostUpload() gin.HandlerFunc {

	fn := func(c *gin.Context) {
		file, err := c.FormFile("file-input")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "File not found"})
			return
		}

		uploadsDirPath := "./uploads"
		savePath := filepath.Join(uploadsDirPath, file.Filename)

		DeleteOldFiles(uploadsDirPath)

		if err := c.SaveUploadedFile(file, savePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
			return
		}

    c.JSON(http.StatusOK, gin.H{"message": "File uploaded successfully"})
		return
	}

	return gin.HandlerFunc(fn)
}

func DeleteOldFiles(path string) {
	ups, err := os.ReadDir(path)
	if err != nil {
		fmt.Printf("Error while reading uploads folder: %v", err)
	}

	for _, file := range ups {
		err := os.Remove(filepath.Join(path, file.Name()))
		if err != nil {
			fmt.Println(err)
		}
	}
}
