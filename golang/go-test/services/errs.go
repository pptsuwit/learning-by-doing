package services

import "errors"

var (
	ErrZeroAmount = errors.New("purchase amount cannot be zero")
	ErrRepository = errors.New("repository error")
)
