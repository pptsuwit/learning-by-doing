package repository

import (
	"database/sql"

	_ "github.com/lib/pq"
)

type customerRepositoryDB struct {
	db *sql.DB
}

func NewCustomerRepositoryDB(db *sql.DB) customerRepositoryDB {
	return customerRepositoryDB{db: db}
}

func (r customerRepositoryDB) GetAll() ([]Customer, error) {
	query := "SELECT customer_id, name, dob, city, zipcode, status FROM customers"
	data, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	customers := []Customer{}
	for data.Next() {
		customer := Customer{}
		err := data.Scan(&customer.CustomerId, &customer.Name, &customer.DateOfBirth, &customer.City, &customer.ZipCode, &customer.Status)
		if err != nil {
			return nil, err
		}
		customers = append(customers, customer)
	}
	return customers, nil
}

func (r customerRepositoryDB) GetById(id int) (*Customer, error) {
	query := `SELECT customer_id, name, dob, city, zipcode, status FROM customers
				WHERE customer_id=$1`
	data := r.db.QueryRow(query, id)
	customer := Customer{}
	err := data.Scan(&customer.CustomerId, &customer.Name, &customer.DateOfBirth, &customer.City, &customer.ZipCode, &customer.Status)
	if err != nil {
		return nil, err
	}
	return &customer, nil
}
