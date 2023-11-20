package handlers_test

import (
	"errors"
	"fmt"
	"go-test/handlers"
	"go-test/services"
	"io"
	"net/http/httptest"
	"strconv"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

func TestCalculateDiscount(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		//Arrange
		amount := 100
		expected := 80

		promotionService := services.NewPromotionServiceMock()
		promotionService.On("CalculateDiscount", amount).Return(expected, nil)

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
	t.Run("bad request", func(t *testing.T) {
		//Arrange
		amount := 100
		expected := fiber.StatusBadRequest

		promotionService := services.NewPromotionServiceMock()
		promotionService.On("CalculateDiscount", amount).Return(0, errors.New(""))

		promotionHandler := handlers.NewPromotionHandler(promotionService)

		app := fiber.New()
		app.Get("/calculate", promotionHandler.CalculateDiscount)

		request := httptest.NewRequest("GET", fmt.Sprintf("/calculate?amount=badrequst"), nil)
		//Act
		response, _ := app.Test(request)

		//Assert
		assert.Equal(t, expected, response.StatusCode)

	})
	t.Run("not found", func(t *testing.T) {
		//Arrange
		amount := 100
		expected := fiber.StatusNotFound

		promotionService := services.NewPromotionServiceMock()
		promotionService.On("CalculateDiscount", amount).Return(0, errors.New(""))

		promotionHandler := handlers.NewPromotionHandler(promotionService)

		app := fiber.New()
		app.Get("/calculate", promotionHandler.CalculateDiscount)

		request := httptest.NewRequest("GET", fmt.Sprintf("/calculate?amount=%v", amount), nil)

		//Act
		app.Test(request)

		//Assert
		assert.Equal(t, expected, 404)

	})
}
