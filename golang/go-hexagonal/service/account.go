package service

type NewAccountRequest struct {
	AccountType string  `json:"accountType"`
	Amount      float64 `json:"amount"`
}
type AccountResponse struct {
	AccountId   int     `json:"accountId"`
	OpeningDate string  `json:"openingDate"`
	AccountType string  `json:"accountType"`
	Amount      float64 `json:"amount"`
	Status      bool    `json:"status"`
}
type AccountService interface {
	NewAccount(int, NewAccountRequest) (*AccountResponse, error)
	GetAccounts(int) ([]AccountResponse, error)
}
