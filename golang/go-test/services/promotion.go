package services

import "go-test/repositories"

type PromotionService interface {
	CalculateDiscount(int) (int, error)
}

type promotionService struct {
	repository repositories.PromotionRepository
}

func NewPromotionService(repository repositories.PromotionRepository) PromotionService {
	return &promotionService{repository: repository}
}

func (s promotionService) CalculateDiscount(amount int) (int, error) {
	if amount <= 0 {
		return 0, ErrZeroAmount
	}
	promotion, err := s.repository.GetPromotion()
	if err != nil {
		return 0, ErrRepository
	}
	if amount >= promotion.PurchaseMin {
		return amount - (promotion.DiscountPercent * amount / 100), nil
	}
	return amount, nil
}
