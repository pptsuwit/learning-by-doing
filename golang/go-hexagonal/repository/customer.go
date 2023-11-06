package repository

type Customer struct {
	CustomerId  int    `db:"customer_id"`
	Name        string `db:"name"`
	DateOfBirth string `db:"dob"`
	City        string `db:"city"`
	ZipCode     string `db:"zipcode"`
	Status      bool   `db:"status"`
}
type CustomerRepository interface {
	GetAll() ([]Customer, error)
	GetById(id int) (*Customer, error)
	// Create(*Customer) (*Customer, error)
	// Update(*Customer) (*Customer, error)
	// Delete(id int) error
}
