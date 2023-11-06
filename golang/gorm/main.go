package main

import (
	"context"
	"fmt"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"gorm.io/gorm/logger"
)

var db *gorm.DB

type SqlLogger struct {
	logger.Interface
}

func (l SqlLogger) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	sql, _ := fc()
	fmt.Printf("%v\n===========================\n", sql)
}
func main() {
	var err error
	dsn := "host=localhost user=postgres password=password dbname=go_db port=5432 sslmode=disable TimeZone=Asia/Bangkok"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{}, &gorm.Config{
		Logger: new(SqlLogger),
		// DryRun: true,
	})
	if err != nil {
		panic("failed to connect database")
	}
	//Create Database
	// db.Migrator().CreateTable(Gender{})
	// db.AutoMigrate(Gender{}, Test{}, CustomerGORM{})

	//Create
	// CreateGender("Male")

	//Get
	// GetGenders()
	// GetGender(1)
	// GetGenderByNameAndID("Male", 1)

	//Update
	// UpdateGender(4, "updateX")
	// UpdateGender2(5, "") //not work on zero value

	//Delete
	// DeleteGender(5)

	// CreateTest(1, "TestCode1")
	// CreateTest(2, "TestCode2")
	// CreateTest(3, "TestCode3")
	// DeleteTest(3)
	// GetTests()

	// CreateCustomer("customer3", 4)
	GetCustomers()
}
func GetCustomers() {
	entities := []CustomerGORM{}
	// tx := db.Preload("Gender").Find(&entities)
	tx := db.Preload(clause.Associations).Find(&entities)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	for _, item := range entities {
		fmt.Printf("%v | %v | %v \n", item.Name, item.Gender.ID, item.Gender.Name)
	}
}
func CreateCustomer(name string, genderId uint) {
	entity := CustomerGORM{Name: name, GenderId: genderId}
	tx := db.Create(&entity)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	fmt.Println(entity)
}
func CreateTest(code uint, name string) {
	entity := Test{Code: code, Name: name}
	tx := db.Create(&entity)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	fmt.Println(entity)
}
func GetTests() {
	entity := []Test{}
	db.Find(&entity)
	for _, t := range entity {
		fmt.Printf("%v | %v | %v \n", t.ID, t.Code, t.Name)
	}

}
func DeleteTest(id uint) {
	// tx := db.Unscoped().Delete(&Test{}, id) // hard delete
	tx := db.Delete(&Test{}, id) //soft deletes
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	fmt.Println("Deleted Success")
	GetTests()
}
func DeleteGender(id uint) {
	tx := db.Delete(&Gender{}, id)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	fmt.Println("Deleted Success")
	GetGenders()
}
func UpdateGender(id uint, name string) {
	gender := Gender{}
	tx := db.First(&gender, id)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	gender.Name = name
	tx = db.Save(&gender)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	fmt.Println(gender)
}
func UpdateGender2(id uint, name string) {
	gender := Gender{Name: name}
	tx := db.Model(&Gender{}).Where("id=?", id).Updates(gender)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	GetGender(id)
}
func GetGender(id uint) {
	gender := Gender{}
	tx := db.First(&gender, id)
	if tx.Error != nil {
		fmt.Println(tx.Error)
	}
	fmt.Println(gender)
}
func GetGenders() {
	genders := []Gender{}
	tx := db.Order("name desc").Find(&genders)
	if tx.Error != nil {
		fmt.Println(tx.Error)
	}
	fmt.Println(genders)
}
func GetGenderByNameAndID(name string, id uint) {
	genders := []Gender{}
	tx := db.Order("name desc").Find(&genders, "name=? AND id=?", name, id)
	if tx.Error != nil {
		fmt.Println(tx.Error)
	}
	fmt.Println(genders)
}
func CreateGender(name string) {
	gender := Gender{Name: name}
	tx := db.Create(&gender)
	if tx.Error != nil {
		fmt.Println(tx.Error)
		return
	}
	fmt.Println(gender)
}

type CustomerGORM struct {
	gorm.Model
	Id       uint
	Name     string
	Gender   Gender
	GenderId uint
}
type Gender struct {
	ID   uint
	Name string `gorm:"unique;size(10)"`
}
type Test struct {
	gorm.Model
	// ID       uint
	// Code     uint   `gorm:"primaryKey;comment:This is Code"`
	// Name string `gorm:"column:username;type:varchar(50);unique;default:Hello World;not null"`
	Code uint
	Name string `gorm:"type:varchar(50);unique;not null"`
}

func (t Test) TableName() string {
	return "tests"
}
