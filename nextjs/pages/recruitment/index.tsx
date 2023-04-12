import HeaderView from "@/components/HeaderView";
import { Grid, TextField } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { jobPositionService } from "services/jobPosition.service";
import { useRouter } from "next/router";
// import Pagination from "@/components/Pagination";

export default function Recruitment() {
  const { t } = useTranslation();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("5");
  const [pageCount, setPageCount] = useState("1");
  const handleChangePage = (value: any) => setPage(value);
  const search = async () => {
    const data = {
      keyword: keyword,
      page: page,
      pageSize: pageSize,
    };
    jobPositionService
      .search(data)
      .then((resp: any) => {
        const data = resp.data;
        const count = resp.count;
        if (count !== 0) {
          setPageCount(count || 1);
        }

        if (router.locale === "th") {
          const entity = data.map((item: any) => {
            return {
              id: item.id,
              title: item.nameTh,
              responsibilities: item.detailTh,
              qualifications: item.qualificationTh,
              count: item.amount,
            };
          });
          setItems(entity);
        } else {
          const entity = data.map((item: any) => {
            return {
              id: item.id,
              title: item.nameEn,
              responsibilities: item.detailEn,
              qualifications: item.qualificationEn,
              count: item.amount,
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
      <HeaderView name={t("common:recruitment")} />
      <Grid container item xs={10} mx="auto" alignContent="flex-start" rowSpacing={3} className="mt-5">
        <Grid item xs={12} sm={9} className="px-3">
          <TextField
            value={keyword}
            onChange={handleKeyword}
            variant="outlined"
            fullWidth
            className="rounded-md"
            sx={{
              "& .MuiOutlinedInput-root": {
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
      <Grid container item xs={12} mx="auto" my={3} alignContent="flex-start" rowSpacing={5}>
        {items.map((item: any) => {
          return (
            <Grid item xs={12} key={item.id} className="xs:px-4 sm:px-20">
              <Link href={`/recruitment/${item.id}`}>
                <div className="w-full h-full pb-10 rounded-br-[60px]  hover:bg-[#e4f5ff] " style={{ boxShadow: "1px 1px 5px 3px rgb(0 0 0 / 0.15)" }}>
                  <Grid container className="px-5 pt-6 text-[#0090E5] font-bold">
                    <Grid
                      container
                      alignContent="center"
                      justifyContent={"start"}
                      item
                      xs={12}
                      sm={12}
                      md={10}
                      className="xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
                    >
                      {item.title}
                    </Grid>
                    <Grid
                      container
                      alignContent="center"
                      item
                      xs={12}
                      sm={12}
                      md={2}
                      className="xs:text-sm sm:text-md md:text-xl lg:text-2xl xs:justify-start sm:justify-start md:justify-end"
                    >{`${item.count} ${t("common:position")}`}</Grid>
                  </Grid>
                  <Box className="w-full foot-bg h-6 mt-6 shadow-gray-400 shadow-md"></Box>
                  <Grid container>
                    <Grid item xl={2} lg={12} md={12} className="xs:text-md sm:text-xl md:text-2xl lg:text-2xl pl-10 pt-6 font-bold flex justify-between">
                      <div>{t("common:responsibilities")}</div>
                      <div>:</div>
                    </Grid>
                    <Grid item xl={10} lg={12} md={12} className="xs:text-sm sm:text-md md:text-2xl lg:text-2xl pl-10 pt-4 " style={{ lineHeight: 2 }}>
                      {item.responsibilities}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xl={2} lg={12} md={12} className="xs:text-md sm:text-xl md:text-2xl lg:text-2xl pl-10 pt-6 font-bold flex justify-between">
                      <div>{t("common:qualifications")}</div>
                      <div>:</div>
                    </Grid>
                    <Grid item xl={10} lg={12} md={12} className="xs:text-sm sm:text-md md:text-2xl lg:text-2xl pl-10 pt-4 " style={{ lineHeight: 2 }}>
                      {item.qualifications}
                    </Grid>
                  </Grid>
                </div>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      {/* <Pagination count={parseInt(`${Math.ceil(parseInt(pageCount) / parseInt(pageSize))}`)} page={page} handleChange={handleChangePage} /> */}
    </>
  );
}
