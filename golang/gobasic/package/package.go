package main

import "gobasic/package/customer"

func main() {
	// can't use this var because it is private
	// user.name

	// don't care about files because same package
	println(customer.Name)
	println(customer.Age)
}
