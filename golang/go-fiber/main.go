package main

import (
	"database/sql"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v4"
	"github.com/golang-jwt/jwt/v5"
	_ "github.com/lib/pq"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id       int    `db:"id" json:"id"`
	Username string `db:"username" json:"username"`
	Password string `db:"password" json:"password"`
}
type SignupRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var db *sql.DB

const jwtSecret = "jwt-secret"

func main() {
	initTimeZone()
	initConfig()
	db = initDatabase()
	app := fiber.New(fiber.Config{
		// Prefork: true,
	})
	app.Use("/hello", jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte(jwtSecret)},
		SuccessHandler: func(c *fiber.Ctx) error {
			return c.Next()
		},
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return fiber.ErrUnauthorized
		},
	}))

	app.Post("signup", Signup)
	app.Post("login", Login)
	app.Get("hello", Hello)
	app.Listen(":8000")
}

func Signup(c *fiber.Ctx) error {
	request := SignupRequest{}
	err := c.BodyParser(&request)
	if err != nil {
		return err
	}
	if request.Username == "" && request.Password == "" {
		return fiber.ErrUnprocessableEntity
	}
	password, err := bcrypt.GenerateFromPassword([]byte(request.Password), 10)
	if err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}
	query := "INSERT INTO users (username,password) VALUES ($1, $2) RETURNING id"
	var id int
	err = db.QueryRow(query, request.Username, string(password)).Scan(&id)
	if err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	user := User{
		Id:       id,
		Username: request.Username,
		Password: string(password),
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}
func Login(c *fiber.Ctx) error {
	request := LoginRequest{}
	err := c.BodyParser(&request)
	if err != nil {
		return err
	}
	if request.Username == "" && request.Password == "" {
		return fiber.ErrUnprocessableEntity
	}
	query := `SELECT id, username, password FROM users
			WHERE username=$1`

	data := db.QueryRow(query, request.Username)
	user := User{}
	err = data.Scan(&user.Id, &user.Username, &user.Password)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Incorrect username of password")
	}
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, "Incorrect username of password")
	}

	claims := jwt.MapClaims{
		"userId":   strconv.Itoa(user.Id),
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}
	jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	token, err := jwtToken.SignedString([]byte(jwtSecret))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{
		"jwtToken": token,
	})

}
func Hello(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["userId"]
	username := claims["username"]
	return c.SendString(fmt.Sprintf("userId : %v \nusername : %v", userId, username))
}

func initConfig() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	err := viper.ReadInConfig()

	if err != nil {
		panic(err)
	}

}

func initTimeZone() {
	ict, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		panic(err)
	}
	time.Local = ict
}
func initDatabase() *sql.DB {
	connStr := fmt.Sprintf("%v://%v:%v@%v:%v/%v?sslmode=disable",
		viper.GetString("db.driver"),
		viper.GetString("db.username"),
		viper.GetString("db.password"),
		viper.GetString("db.host"),
		viper.GetInt("db.port"),
		viper.GetString("db.database"),
	)
	fmt.Println(connStr)
	db, err := sql.Open(viper.GetString("db.driver"), connStr)
	if err != nil {
		panic(err)
	}
	db.SetConnMaxLifetime(3 * time.Minute)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	return db
}
