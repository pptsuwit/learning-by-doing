import MenuHeader from "@/components/Home/MenuHeader";
import { Grid, TextField } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { productService } from "services/product.service";
import { useRouter } from "next/router";
// import Pagination from "@/components/Pagination";

export default function Product() {
  const { t } = useTranslation();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("6");
  const [pageCount, setPageCount] = useState("1");
  const handleChangePage = (value: any) => setPage(value);
  const search = async () => {
    const data = {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    };
    productService
      .search(data)
      .then((resp: any) => {
        const data = resp.data.sort((a: any, b: any) => b.id - a.id);
        const count = resp.count;
        // data;
        if (count !== 0) {
          setPageCount(count || 1);
        }

        if (router.locale === "th") {
          const entity = data.map((item: any) => {
            return {
              id: item.id,
              bgImg: item.productImg,
              title: item.nameTh,
            };
          });
          setItems(entity);
        } else {
          const entity = data.map((item: any) => {
            return {
              id: item.id,
              bgImg: item.productImg,
              title: item.nameEn,
            };
          });
          setItems(entity);
        }
      })
      .catch(() => {});
  };
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale, keyword, page, pageSize]);
  const resetPage = () => {
    setPage(1);
    setPageCount("0");
  };
  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (keyword !== e.target.value) resetPage();
    setKeyword(e.target.value);
  };
  return (
    <>
      <MenuHeader header={t("common:product")} />
      <Grid container item xs={10} mx="auto" alignContent="flex-start" rowSpacing={3} className="mt-5">
        <Grid item xs={12} sm={9} className="px-3">
          <TextField
            placeholder={t("common:product")}
            value={keyword}
            onChange={handleKeyword}
            variant="outlined"
            fullWidth
            className="rounded-md"
            sx={{
              "& .MuiOutlinedInput-root": {
                pl: 2,
                "& fieldset": {
                  borderRadius: 8,
                  borderColor: "#0090E5",
                },
                "&:hover fieldset": {
                  border: 2,
                  borderColor: "#0090E5",
                },
              },
            }}
            InputProps={{
              endAdornment: <SearchIcon fontSize="large" color="primary" />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} className="px-3">
          <Button variant="contained" onClick={search} className="bg-amber-400 font-bold text-2xl w-[100%] " sx={{ borderRadius: 25, py: "12px" }}>
            {t("common:search")}
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} my={3} alignContent="flex-start">
        {items.map((item: any) => {
          return (
            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} height={"500px"} key={item.id} className="px-10">
              <div
                className="relative shadow-lg drop-shadow-lg rounded-tr-[60px] rounded-bl-[60px] "
                style={{
                  backgroundImage: `url("${item.bgImg}")`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-center pt-[350px]">
                  <div className=" bg-text-home overflow-hidden rounded-bl-[60px]">
                    <div className={` bg-text-hometext-xl font-bold ${item.bgImg !== null ? "text-white" : "text-black"}`}>
                      <p style={{ overflow: "hidden", textOverflow: "ellipsis", height: "2ch" }}>{item.title}</p>
                    </div>

                    <Link href={`/product/${item.id}`}>
                      <Button variant="contained" className="bg-amber-400 mb-5" sx={{ borderRadius: 25, width: "120px", textTransform: "none", mt: 2 }}>
                        {t("common:viewmore")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
      {/* <Pagination count={parseInt(`${Math.ceil(parseInt(pageCount) / parseInt(pageSize))}`)} page={page} handleChange={handleChangePage} /> */}
    </>
  );
}
