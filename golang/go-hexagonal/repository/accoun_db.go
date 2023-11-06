package repository

import "database/sql"

type accountRepositoryDB struct {
	db *sql.DB
}

func NewAccountRepositoryDB(db *sql.DB) accountRepositoryDB {
	return accountRepositoryDB{db: db}
}

func (r accountRepositoryDB) GetAll(customerId int) ([]Account, error) {
	query := "SELECT account_id, customer_id, opening_date, account_type, amount, status FROM accounts WHERE customer_id = $1"

	data, err := r.db.Query(query, customerId)
	if err != nil {
		return nil, err
	}
	entities := []Account{}
	for data.Next() {
		entity := Account{}
		err := data.Scan(&entity.AccountId, &entity.CustomerId, &entity.OpeningDate, &entity.AccountType, &entity.Amount, &entity.Status)
		if err != nil {
			return nil, err
		}
		entities = append(entities, entity)
	}
	return entities, nil
}

func (r accountRepositoryDB) Create(acc Account) (*Account, error) {
	query := "INSERT INTO accounts (customer_id, opening_date, account_type, amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING account_id"
	var id int
	err := r.db.QueryRow(query, acc.CustomerId, acc.OpeningDate, acc.AccountType, acc.Amount, acc.Status).Scan(&id)
	if err != nil {
		return nil, err
	}

	acc.AccountId = int(id)
	return &acc, nil
}
