package repository

type Account struct {
	AccountId   int     `db:"account_id"`
	CustomerId  int     `db:"customer_id"`
	OpeningDate string  `db:"opening_date"`
	AccountType string  `db:"account_type"`
	Amount      float64 `db:"amount"`
	Status      bool    `db:"status"`
}

type AccountRepository interface {
	GetAll(customer int) ([]Account, error)
	// GetById(id int) (*Account, error)
	Create(account Account) (*Account, error)
	// Update(account Account) (*Account, error)
}
