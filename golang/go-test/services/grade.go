package services

func CheckGrade(i int) string {
	if i >= 80 {
		return "A"
	}
	if i >= 70 {
		return "B"
	}
	if i >= 60 {
		return "C"
	}
	if i >= 50 {
		return "D"
	} else {
		return "F"
	}
}
