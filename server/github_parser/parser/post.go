package githubparser

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ReturnTestCoverage tests the repository and returns the coverage
func ReturnTestCoverage(c *gin.Context, org string, repo string) {
	message := "Post is returning 200" + org + repo
	c.String(http.StatusOK, message)
}
