package main

import (
	"fmt"
	"gobasic/struct/person"
)

func main() {
	x := person.Person{}
	x.SetName("John")
	x.SetAge(19)
	fmt.Printf("%#v \n", x.GetName())
	fmt.Printf("%#v", x.GetAge())
}
