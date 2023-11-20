package services

import "github.com/stretchr/testify/mock"

type PromotionServiceMock struct {
	mock.Mock
}

func NewPromotionServiceMock() *PromotionServiceMock {
	return &PromotionServiceMock{}
}

func (m *PromotionServiceMock) CalculateDiscount(amount int) (int, error) {
	args := m.Called(amount)
	return args.Int(0), args.Error(1)
}
