package handler

import (
	"encoding/json"
	"go-hexagonal/errs"
	"go-hexagonal/service"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type accountHandler struct {
	accountService service.AccountService
}

func NewAccountHandler(accountService service.AccountService) accountHandler {
	return accountHandler{
		accountService: accountService,
	}
}

func (h accountHandler) NewAccount(w http.ResponseWriter, r *http.Request) {
	customerId, _ := strconv.Atoi(mux.Vars(r)["customerID"])
	if r.Header.Get("Content-Type") != "application/json" {
		handleError(w, errs.NewValidationError("request body incorrect format"))
		return
	}
	request := service.NewAccountRequest{}
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		handleError(w, errs.NewValidationError("request body incorrect format"))
		return
	}
	response, err := h.accountService.NewAccount(customerId, request)
	if err != nil {
		handleError(w, err)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h accountHandler) GetCustomer(w http.ResponseWriter, r *http.Request) {
	customerId, _ := strconv.Atoi(mux.Vars(r)["customerID"])

	responses, err := h.accountService.GetAccounts(customerId)
	if err != nil {
		handleError(w, err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}
