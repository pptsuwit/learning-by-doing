package services_test

import (
	"errors"
	"go-test/repositories"
	"go-test/services"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCalculateDiscount(t *testing.T) {
	type testCase struct {
		name            string
		perchaseMin     int
		discountPercent int
		amount          int
		expected        int
	}
	cases := []testCase{
		{name: "applied 100", perchaseMin: 100, discountPercent: 20, amount: 100, expected: 80},
		{name: "applied 200", perchaseMin: 100, discountPercent: 20, amount: 200, expected: 160},
		{name: "applied 300", perchaseMin: 100, discountPercent: 20, amount: 300, expected: 240},
		{name: "not applied 50", perchaseMin: 100, discountPercent: 20, amount: 50, expected: 50},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			// got, err := services.CalculateDiscount(c.perchaseMin, c.discountPercent, c.amount)
			//Arrange
			promotionRepository := repositories.NewPromotionRepositoryMock()
			promotionRepository.On("GetPromotion").Return(repositories.Promotion{
				ID:              1,
				PurchaseMin:     c.perchaseMin,
				DiscountPercent: c.discountPercent,
			}, nil)
			promotionService := services.NewPromotionService(promotionRepository)

			//Act
			discount, _ := promotionService.CalculateDiscount(c.amount)
			expected := c.expected

			//Assert
			assert.Equal(t, expected, discount)
			// assert.NoError(t, err)
		})
	}
	t.Run("purchase amount zero", func(t *testing.T) {
		promotionRepository := repositories.NewPromotionRepositoryMock()
		promotionRepository.On("GetPromotion").Return(repositories.Promotion{
			ID:              1,
			PurchaseMin:     100,
			DiscountPercent: 20,
		}, nil)
		promotionService := services.NewPromotionService(promotionRepository)
		//Act
		_, err := promotionService.CalculateDiscount(0)
		//Assert
		assert.ErrorIs(t, err, services.ErrZeroAmount)
		promotionRepository.AssertNotCalled(t, "GetPromotion")
	})
	t.Run("repository err", func(t *testing.T) {
		promotionRepository := repositories.NewPromotionRepositoryMock()
		promotionRepository.On("GetPromotion").Return(repositories.Promotion{}, errors.New(""))
		promotionService := services.NewPromotionService(promotionRepository)
		//Act
		_, err := promotionService.CalculateDiscount(100)
		//Assert
		assert.ErrorIs(t, err, services.ErrRepository)
	})

}
