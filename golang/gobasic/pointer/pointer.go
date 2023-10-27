package main

func main() {
	// x := 10
	// y := &x
	// println(x, *y)

	x := 10
	y := &x
	*y = 20
	println(x)
	println(*y)
	println(y)
	println(&y)
	x = 30
	println(x)
	println(*y)

	// x := 50000
	// sum2(x)
	// println(x)

	// sum(&x)
	// println(x)
}

func sum(result *int) {
	a := 10
	b := 20
	*result = a + b
}
func sum2(result int) {
	a := 10
	b := 20
	result = a + b
}
