package service

import (
	"go-hexagonal/errs"
	"go-hexagonal/logs"
	"go-hexagonal/repository"
	"strings"
	"time"
)

type accountService struct {
	accountRepository repository.AccountRepository
}

func NewAccountService(accountRepository repository.AccountRepository) accountService {
	return accountService{accountRepository: accountRepository}
}

func (s accountService) NewAccount(customerId int, request NewAccountRequest) (*AccountResponse, error) {

	if request.Amount < 5000 {
		return nil, errs.NewValidationError("Amount at least 5000")
	}
	if strings.ToLower(request.AccountType) != "saving" && strings.ToLower(request.AccountType) != "checking" {
		return nil, errs.NewValidationError("Account type must be checking or saving")
	}
	// account, err := s.accountRepository.GetById(customerId)
	// if err != nil {
	// 	return nil, err
	// }
	// if account != nil {
	// 	return nil, errs.New("account already exists")
	// }
	account, err := s.accountRepository.Create(repository.Account{
		CustomerId:  customerId,
		OpeningDate: time.Now().Format("2006-1-2 15:04:05"),
		AccountType: request.AccountType,
		Amount:      request.Amount,
		Status:      true,
	})
	if err != nil {
		return nil, err
	}
	return &AccountResponse{
		AccountId: account.AccountId,
		// CustomerId:  account.CustomerId,
		AccountType: account.AccountType,
		OpeningDate: account.OpeningDate,
		Amount:      account.Amount,
		Status:      account.Status,
	}, nil
}

func (s accountService) GetAccounts(customerId int) ([]AccountResponse, error) {
	accounts, err := s.accountRepository.GetAll(customerId)
	if err != nil {
		logs.Error(err)
		return nil, errs.NewUnexpectedError()
	}

	accountResponse := []AccountResponse{}

	for _, account := range accounts {
		accountResponse = append(accountResponse, AccountResponse{
			AccountId:   account.AccountId,
			OpeningDate: account.OpeningDate,
			AccountType: account.AccountType,
			Amount:      account.Amount,
			Status:      account.Status,
		})
	}
	return accountResponse, nil
}
