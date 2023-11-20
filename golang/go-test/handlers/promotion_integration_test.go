//go:build integration

package handlers_test

import (
	"fmt"
	"go-test/handlers"
	"go-test/repositories"
	"go-test/services"
	"io"
	"net/http/httptest"
	"strconv"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

func TestCalculateDiscountIntegrationService(t *testing.T) {
	t.Run("success", func(t *testing.T) {

		amount := 100
		expected := 80

		promotionRepository := repositories.NewPromotionRepositoryMock()
		promotionRepository.On("GetPromotion").Return(repositories.Promotion{
			ID:              1,
			PurchaseMin:     100,
			DiscountPercent: 20,
		}, nil)

		promotionService := services.NewPromotionService(promotionRepository)
		promotionHandler := handlers.NewPromotionHandler(promotionService)

		app := fiber.New()
		app.Get("/calculate", promotionHandler.CalculateDiscount)

		request := httptest.NewRequest("GET", fmt.Sprintf("/calculate?amount=%v", amount), nil)
		//Act
		response, _ := app.Test(request)

		//Assert
		if assert.Equal(t, fiber.StatusOK, response.StatusCode) {
			body, _ := io.ReadAll(response.Body)
			assert.Equal(t, strconv.Itoa(expected), string(body))
		}
	})
}
