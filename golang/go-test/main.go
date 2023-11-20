package main

import (
	"errors"
	"fmt"

	"github.com/stretchr/testify/mock"
)

func main() {
	c := CustomerRepositoryMock{}
	c.On("GetCustomer", 1).Return(Customer{
		Id:   "1",
		Name: "<NAME>",
		Age:  20,
	}, nil)
	c.On("GetCustomer", 2).Return(Customer{}, errors.New("not found"))

	customer, err := c.GetCustomer(2)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(customer)
}

type CustomerRepositoryMock struct {
	mock.Mock
}

type Customer struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func (m *CustomerRepositoryMock) GetCustomer(id int) (Customer, error) {
	args := m.Called(id)
	return args.Get(0).(Customer), args.Error(1)
}
