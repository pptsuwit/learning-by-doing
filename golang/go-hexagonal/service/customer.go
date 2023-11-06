package service

type CustomerResponse struct {
	CustomerId int    `json:"customer_id"`
	Name       string `json:"name"`
	Status     bool   `json:"status"`
}
type CustomerService interface {
	GetCustomers() ([]CustomerResponse, error)
	GetCustomer(id int) (*CustomerResponse, error)
}
