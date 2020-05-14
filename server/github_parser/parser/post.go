package githubparser

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
	"gopkg.in/src-d/go-git.v4"
)

// ReturnTestCoverage tests the repository and returns the coverage
func ReturnTestCoverage(c *gin.Context, org string, repo string) {
	gitDirectory := "/tmp/" + org + "/" + repo
	gitURL := "https://github.com/" + org + "/" + repo + ".git "

	// clone the repository pointed to by the endpoint
	_, err := git.PlainClone(gitDirectory, false, &git.CloneOptions{
		URL:      gitURL,
		Progress: os.Stdout,
	})
	if err != nil {
		fmt.Printf("The HTTP request failed or repository already exists %s\n", err)
	}

	// run the go test command
	cmd := exec.Command("go", "test", "--coverprofile", "coverage.out", "./...")
	cmd.Dir = gitDirectory
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()
	if err != nil {
		log.Fatalf("cmd.Run() failed with %s\n", err)
	}

	// get coverage.out from the directory and pass it to the helper function
	filePath := gitDirectory + "/coverage.out"
	TestFile, err := ioutil.ReadFile(filePath)
	if err != nil {
		fmt.Println("File reading error", err)
		return
	}
	TestJSON := ParseCover(TestFile)
	c.JSON(http.StatusOK, TestJSON)
}
