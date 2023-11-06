package repository

import "errors"

type customerRepositoryMock struct {
	customers []Customer
}

func NewCustomerRepositoryMock() customerRepositoryMock {

	customers := []Customer{
		{CustomerId: 1000, Name: "MockCustomerA", DateOfBirth: "1999-01-01", City: "Thailand", ZipCode: "10000", Status: true},
		{CustomerId: 1001, Name: "MockCustomerB", DateOfBirth: "1992-02-02", City: "Thailand", ZipCode: "10002", Status: true},
	}
	return customerRepositoryMock{customers: customers}
}

func (r customerRepositoryMock) GetAll() ([]Customer, error) {
	return r.customers, nil
}
func (r customerRepositoryMock) GetById(id int) (*Customer, error) {
	for _, customer := range r.customers {
		if customer.CustomerId == id {
			return &customer, nil
		}
	}
	return nil, errors.New("customer not found")
}
