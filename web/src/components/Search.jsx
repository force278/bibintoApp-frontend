import { gql, useLazyQuery } from "@apollo/client"
import searchGray from "../assets/img/header/searchGray.svg"
import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useHistory } from "react-router-dom"
import avatar from "../assets/img/editProfile/defaultAvatar.png"
import styled from "styled-components"

const StyledAutocomplete = styled(Autocomplete)`
  .MuiAutocomplete-inputRoot {
    border: none;
    padding: 0;
    outline: none;
  }

  .MuiFormLabel-root.Mui-focused {
    display: none !important;
  }

  .MuiOutlinedInput-root {
    padding: 0 !important;
  }

  .MuiFormLabel-root {
    top: -7px !important;
    color: #959595 !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiAutocomplete-endAdornment {
    display: none !important;
  }
  .MuiAutocomplete-root {
    width: 0 !important;
  }
`

const SEARCH_QUERY = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      username
      avatar
    }
  }
`

function Search() {
  const [searchUsers, { loading, data }] = useLazyQuery(SEARCH_QUERY)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const history = useHistory()
  useEffect(() => {
    searchUsers({ variables: { keyword: "" } })
  }, [searchUsers])

  const options = data?.searchUsers || []

  return (
    <div className="d-flex flex-row">
      <div className="inputSearch hideElement">
        <StyledAutocomplete
          id="country-select-demo"
          sx={{ width: 200 }}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          isOptionEqualToValue={(option, value) =>
            option.username === value.username
          }
          getOptionLabel={(option) => option.username}
          options={options}
          loading={loading}
          autoHighlight
          noOptionsText="Ничего не найдено"
          inputValue={searchValue}
          onInputChange={(event) => setSearchValue(event?.target?.value || "")}
          onChange={(event, newValue) => {
            if (newValue) {
              history.push(`/${newValue.username}`)
              setSearchValue("")
            }
          }}
          value={null}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={option.avatar || avatar}
                style={{ borderRadius: "50%" }}
                alt=""
              />
              {option.username}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Поиск"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
        <img src={searchGray} alt="search" className="inputSearch__icon" />
      </div>
    </div>
  )
}

export default Search
