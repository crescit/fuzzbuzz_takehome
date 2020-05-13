package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	gitParser "github.com/crescit/fuzzbuzz_takehome/github_parser/parser"
)

// main entry point for the server
func main() {
	r := gin.Default()
	// a line to get the docker image to run
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	api := r.Group("/api")

	// GET ​/api/:github_org/:github_repo/info​→ returns basic info about the repo (stars, list of files)
	api.GET("/:github_org/:github_repo/info", func(c *gin.Context) {
		org := c.Param("github_org")
		repo := c.Param("github_repo")
		gitParser.ReturnRepoInfo(c, org, repo)
	})

	// POST ​/api/:github_org/:github_repo/test​→ runs the Go tests and returns the coverage profile
	api.POST("/:github_org/:github_repo/info", func(c *gin.Context) {
		org := c.Param("github_org")
		repo := c.Param("github_repo")
		gitParser.ReturnTestCoverage(c, org, repo)
	})

	r.Run()
}
