package service

import (
	"database/sql"
	"go-hexagonal/errs"
	"go-hexagonal/logs"
	"go-hexagonal/repository"
)

type customerService struct {
	customerRepository repository.CustomerRepository
}

func NewCustomerService(customerRepository repository.CustomerRepository) customerService {
	return customerService{customerRepository: customerRepository}
}

func (s customerService) GetCustomers() ([]CustomerResponse, error) {
	customers, err := s.customerRepository.GetAll()
	if err != nil {
		logs.Error(err)
		return nil, errs.NewUnexpectedError()
	}

	customerResponse := []CustomerResponse{}

	for _, customer := range customers {
		customerResponse = append(customerResponse, CustomerResponse{
			CustomerId: customer.CustomerId,
			Name:       customer.Name,
			Status:     customer.Status,
		})
	}
	return customerResponse, nil
}

func (s customerService) GetCustomer(id int) (*CustomerResponse, error) {
	customer, err := s.customerRepository.GetById(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errs.NewNotFoundError("Customer not found")
		}
		logs.Error(err)
		return nil, errs.NewUnexpectedError()
	}

	customerResponse := &CustomerResponse{
		CustomerId: customer.CustomerId,
		Name:       customer.Name,
		Status:     customer.Status,
	}
	return customerResponse, nil
}
