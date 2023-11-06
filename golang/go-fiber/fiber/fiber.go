package fiber

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func main() {
	app := fiber.New(fiber.Config{
		// Prefork: true,
	})

	app.Use("/root", func(c *fiber.Ctx) error {
		fmt.Println("before")
		c.Locals("name", "Fiber")
		err := c.Next()
		fmt.Println("after")
		return err
	})
	app.Use(requestid.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New(logger.Config{TimeZone: "Asia/Bangkok"}))

	app.Get("/root", func(c *fiber.Ctx) error {

		name := c.Locals("name")
		fmt.Println("hello")
		return c.SendString(fmt.Sprintf("Hello World! Get: %v", name))
	})

	app.Post("/root", func(c *fiber.Ctx) error {
		return c.SendString("Hello World! Post")
	})

	////Parameter
	// app.Get("/root:id", func(c *fiber.Ctx) error {
	// 	id := c.Params("id")
	// 	return c.SendString("Hello World Parameters :" + id)
	// })

	//// Optional parameters
	// app.Get("/root:id/:name?", func(c *fiber.Ctx) error {
	// 	id := c.Params("id")
	// 	name := c.Params("name")
	// 	return c.SendString("Hello World Parameters :" + id + " name : " + name)
	// })

	//ParamsInt
	app.Get("/root/:id/:name?", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return fiber.ErrBadRequest
		}

		return c.SendString(fmt.Sprintf("ID : %v", id))
	})
	//Query
	app.Get("/query", func(c *fiber.Ctx) error {
		name := c.Query("name")
		email := c.Query("email")
		return c.SendString(fmt.Sprintf("name : %v , email: %v", name, email))
	})

	//Query Parser
	app.Get("/query2", func(c *fiber.Ctx) error {
		person := Persion{}
		c.QueryParser(&person)
		return c.JSON(person)
	})

	//Wildcard
	app.Get("/wildcard/*", func(c *fiber.Ctx) error {
		wildcard := c.Params("*")
		return c.SendString(wildcard)
	})

	//Static file
	app.Static("/wwwroot", "./wwwroot")

	//New Error
	app.Get("/error", func(c *fiber.Ctx) error {
		return fiber.NewError(fiber.StatusNotFound, "content not found")
	})

	//Group

	v1 := app.Group("/v1", func(c *fiber.Ctx) error {
		c.Set("Version", "v1")
		return c.Next()
	})
	v1.Get("/root", func(c *fiber.Ctx) error {
		return c.SendString(fmt.Sprintf("Hello World! V1"))
	})

	v2 := app.Group("/v2", func(c *fiber.Ctx) error {
		c.Set("Version", "v2")
		return c.Next()
	})
	v2.Get("/root", func(c *fiber.Ctx) error {
		return c.SendString(fmt.Sprintf("Hello World! V2"))
	})

	//Mount
	userApp := fiber.New()
	userApp.Get("/login", func(c *fiber.Ctx) error {
		return c.SendString(fmt.Sprintf("Login"))
	})
	app.Mount("user", userApp)

	//Server
	app.Server().MaxConnsPerIP = 1
	app.Get("/server", func(c *fiber.Ctx) error {
		time.Sleep(time.Second * 30)
		return c.SendString("server")
	})

	// Environment
	app.Get("/env", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"BaseUrl":     c.BaseURL(),
			"Hostname":    c.Hostname(),
			"IP":          c.IP(),
			"IPs":         c.IPs(),
			"OriginalUrl": c.OriginalURL(),
			"Path":        c.Path(),
			"Protocal":    c.Protocol(),
			"Subdomains":  c.Subdomains(),
		})
	})

	// Body
	app.Post("/body", func(c *fiber.Ctx) error {
		fmt.Printf("IsJson : %v \n", c.Is("json"))
		// fmt.Println(string(c.Body()))
		person := Persion{}
		err := c.BodyParser(&person)
		if err != nil {
			fmt.Println("error parsing")
			return err
		}
		fmt.Println(person)
		return nil
	})
	// Body Map
	app.Post("/body-map", func(c *fiber.Ctx) error {
		fmt.Printf("IsJson : %v \n", c.Is("json"))
		data := map[string]interface{}{}
		err := c.BodyParser(&data)
		if err != nil {
			fmt.Println("error parsing")
			return err
		}
		fmt.Println(data)
		return nil
	})

	app.Listen(":8000")
}

type Persion struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}
