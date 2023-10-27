package function

func main() {

	Add(10, 20)
	Sub(10, 20)
	Hello("string")

	Cal(Add, 10, 20)
	Cal(Sub, 20, 10)
	// Cal function can't calculate because type is not supported
	// Cal(Hello,"string")

	sumValue := Sum(1, 2, 3, 4, 5, 6, 7, 8, 9)
	println(sumValue)

}
func Hello(name string) string {
	return "Hello, " + name
}
func Add(a, b int) int {
	return a + b
}
func Sub(a, b int) int {
	return a - b
}
func Cal(f func(int, int) int, a int, b int) {
	println(f(a, b))
}
func Sum(value ...int) int {
	result := 0
	for _, v := range value {
		result += v
	}
	return result
}
