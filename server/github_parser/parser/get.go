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
}

// ContentStructure returns the content of the file
type ContentStructure struct {
	Name    string `json:"name"`
	Content string `json:"content"`
	Type    string `json:"type"`
	Message string `json:"message"`
}

// RepoResponse is a struct that parses githubs api response
type RepoResponse struct {
	ErrorMessage string          `json:"message"`
	Content      []FileStructure `json:"body"`
}

// ReturnRepoInfo is the main function handling the return of the repository info
func ReturnRepoInfo(c *gin.Context, org string, repo string) {
	// desired url to get main folder structure: https://api.github.com/repos/org/repo/contents/

	// make the request to github
	url := "https://api.github.com/repos/" + org + "/" + repo + "/contents/"
	response, err := http.Get(url)

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
	var filelist []FileStructure
	if err := json.Unmarshal(data, &filelist); err != nil {
		fmt.Println("Error unmarshalling the response to FileStructure struct")
		c.String(500, "Failed to parse response ")
	}

	ProcessedFiles := processLinksForContentString(filelist)
	c.JSON(http.StatusOK, ProcessedFiles)
}

// processLinksForContentString takes each link returned from the file and calls for the content
func processLinksForContentString(files []FileStructure) (FilesContent []ContentStructure) {
	var Content []ContentStructure
	// for each link in file structure
	for _, element := range files {
		// call get and unmarshal to the struct
		response, err := http.Get(element.URL)
		if err != nil {
			fmt.Printf("failed to get content for %s", element.Name)
		} else {
			defer response.Body.Close()
			data, _ := ioutil.ReadAll(response.Body)
			var filecontent ContentStructure
			json.Unmarshal(data, &filecontent)
			// check for api limit message otherwise append to response
			if filecontent.Message != "" {
				fmt.Printf("API LIMIT HIT WONT APPEND PROPERLY")
			} else {
				Content = append(Content, filecontent)
			}
		}
	}
	// append to Content and return Content from the endpoint
	return Content
}
