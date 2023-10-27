package person

type Person struct {
	Jname string `json:"name"`
	Jage  int    `json:"age"`
	name  string
	age   int
}

func (p Person) Hello(txt string) string {
	return "Hello " + p.name + " " + txt
}

func (p *Person) SetName(name string) {
	p.name = name
}
func (p *Person) SetAge(age int) {
	p.age = age
}

func (p Person) GetName() string {
	return p.name
}
func (p Person) GetAge() int {
	return p.age
}
