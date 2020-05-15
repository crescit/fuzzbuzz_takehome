package githubparser

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

// FileStructure is the struct of a file which when the endpoint is successful returns an array of these
type FileStructure struct {
	Name string `json:"name"`
	URL  string `json:"url"`
	Type string `json:"type"`
}

// ContentStructure returns the content of the file
type ContentStructure struct {
	Name    string `json:"name"`
	Content string `json:"content"`
	Type    string `json:"type"`
	Message string `json:"message"`
}

// RepoInfo is the struct that defines the return type for return repo info
type RepoInfo struct {
	Files []FileStructure `json:"files"`
	Stars int64           `json:"stars"`
}

// RepoResponse is a struct that parses githubs api content response
type RepoResponse struct {
	ErrorMessage string          `json:"message"`
	Content      []FileStructure `json:"body"`
}

// RepoInfoResponse is a struct that parses githubs api repo response
type RepoInfoResponse struct {
	ErrorMessage string `json:"message"`
	Stars        int64  `json:"stargazers_count"`
}

// ReturnRepoInfo is the main function handling the return of the repository info
func ReturnRepoInfo(c *gin.Context, org string, repo string) {
	// get the repo information first to get the desired number of stars
	repoURL := "https://api.github.com/repos/" + org + "/" + repo
	res, error := http.Get(repoURL)
	if error != nil {
		fmt.Printf("The HTTP request failed with error %s\n", error)
		c.String(500, "The HTTP request to Github Failed %s\n")
	}
	var repoRes RepoInfoResponse
	repoInfo, _ := ioutil.ReadAll(res.Body)
	defer res.Body.Close()
	json.Unmarshal(repoInfo, &repoRes)

	// the github endpoint doesnt 404 if the repo isnt found so check for an message first
	if repoRes.ErrorMessage == "Not Found" {
		fmt.Println(repoRes.ErrorMessage)
		c.String(500, "Repository not found")
	}

	// desired url to get main folder structure: https://api.github.com/repos/org/repo/contents/
	// make the request to github to get the content of the repo
	contentURL := "https://api.github.com/repos/" + org + "/" + repo + "/contents/"
	response, err := http.Get(contentURL)

	// error case for if the api fails
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
		c.String(500, "The HTTP request to Github Failed %s\n")
	}

	// parse the response properly to what to send to the client
	var parsedResponse RepoResponse
	data, _ := ioutil.ReadAll(response.Body)
	defer response.Body.Close()
	json.Unmarshal(data, &parsedResponse)

	// the github endpoint doesnt 404 if the repo isnt found so check for an message first
	if parsedResponse.ErrorMessage == "Not Found" {
		fmt.Println(parsedResponse.ErrorMessage)
		c.String(500, "Repository not found")
	}

	// parse the array of files from the response into an array of FileStructure
	var Filelist []FileStructure
	if err := json.Unmarshal(data, &Filelist); err != nil {
		fmt.Println("Error unmarshalling the response to FileStructure struct")
		c.String(500, "Failed to parse response ")
	}

	var RepoRes RepoInfo
	RepoRes.Files = Filelist
	RepoRes.Stars = repoRes.Stars
	// Line below call the download link for each file and sent the content over
	// ProcessedFiles := processLinksForContentString(filelist)
	c.JSON(http.StatusOK, RepoRes)
}
