import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectBox from "../SelectBox";
import OnClickOutside from "../OnClickOutside";

/**
 * sortOptionsABC
 * Function to sort options alphabetically
 * @param {array} options - items to be sorted
 * @return alphabetically sorted array
 */
export function sortOptionsABC(options) {
  return options.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

/**
 * searchFilterOptions
 * Function to filter list by search input
 * @param {string} searchText - search field input
 * @param {array} options - list of items to be searched through
 * @return new array filtered by search input
 */
export function searchFilterOptions(searchText, options) {
  return options.filter(function (o) {
    return o.name.toString().toLowerCase().includes(searchText.toLowerCase());
  });
}

/** Generate a SingleSelectBox
 *
 * @param {array:object} options - options in format id, name, value (checked state boolean)
 * @param {object} selectedOption - id, name, value for the selected Option
 * @param {string} children - button content
 * @param {function} onSelectChange - trigger when user selects/deselects an item
 * @param {boolean} isDisabled - should the button be disabled from interaction
 * @param {boolean} searchEnabled - should search functionality be added
 * @param {boolean} sortABC - should the options be listed alphabetically
 * @param {array:string} style - classNames
 * @param {string} testId - Id to be added to component for testing purposes
 * @param {boolean} isHidden - should the button be hidden
 */

const SingleSelectBox = ({
  options,
  children,
  selectedOption,
  onSelectChange,
  isDisabled,
  style,
  searchEnabled,
  sortABC,
  testId,
  isHidden,
}) => {
  const [isOpen, updateOpen] = useState(false);
  const dropdownVisibility = isOpen ? "visible" : "";
  const selectBoxVisibility = isOpen ? "" : "visible";
  const [searchInput, updateSearchInput] = useState("");
  const [optionsPrepped, updateOptions] = useState(
    searchFilterOptions(
      searchInput,
      sortABC ? sortOptionsABC(options) : options
    )
  );

  useEffect(() => {
    updateOptions(
      searchFilterOptions(
        searchInput,
        sortABC ? sortOptionsABC(options) : options
      )
    );
  }, [options]);

  useEffect(() => {
    updateSearchInput("");
    updateOptions(options);
  }, [isOpen === false]);

  const handleClick = (option) => {
    updateOpen(false);
    onSelectChange(option);
  };

  const filteredOptions = (searchText) => {
    let newOptions = JSON.parse(JSON.stringify(options));
    let secondLevel = null;

    // 1st level filter
    let firstLevel = options.filter((o) =>
      o.name.toString().toLowerCase().includes(searchText.toLowerCase())
    );

    // 2nd level filter
    if (
      firstLevel.length === 0 &&
      options.filter((o) => o.items !== undefined).length > 0
    ) {
      secondLevel = options
        .filter((o) => o.items !== undefined)
        .map((o) =>
          o.items.filter((i) =>
            i.name.toString().toLowerCase().includes(searchText.toLowerCase())
          )
        );

      secondLevel = options
        .filter((o, i) => secondLevel[i]?.length > 0)
        .map((o, i) => {
          newOptions[i].items = secondLevel[i];
          return newOptions[i];
        })
        .filter((o) => o !== undefined);
    }

    return secondLevel === null ? firstLevel : secondLevel;
  };

  const searchBar = () => {
    return (
      <div className="searchbox">
        <input
          onChange={(e) => {
            e.target.value.length < 1
              ? updateOptions(options)
              : updateOptions(filteredOptions(e.target.value));
            updateSearchInput(e.target.value);
          }}
          placeholder="Search..."
          value={searchInput}
        />
        <i className="ti-search" />
      </div>
    );
  };

  const buttonContent = () => {
    if (
      style !== undefined &&
      (style.includes("table-action-btn") ||
        style.includes("constant-btn-text"))
    ) {
      return children;
    } else {
      return (
        <React.Fragment>
          <span data-testid={`${testId}-button`} style={{ float: "left" }}>
            {selectedOption !== null && selectedOption.name !== undefined
              ? selectedOption.name
              : selectedOption !== null && selectedOption.value !== undefined
              ? selectedOption.value
              : selectedOption !== null && selectedOption !== undefined
              ? selectedOption
              : children}
          </span>
        </React.Fragment>
      );
    }
  };

  return (
    <OnClickOutside config={() => updateOpen(false)}>
      <SelectBox
        isDisabled={isDisabled}
        isHidden={isHidden}
        isOpen={isOpen}
        style={style}
        testId={testId}
      >
        <button
          className={`selectbox__button ${selectBoxVisibility} ${
            isDisabled ? "disabled" : ""
          }`}
          onClick={() => updateOpen(!isOpen)}
        >
          {buttonContent()}
        </button>

        <div
          className={`selectbox__dropdown ${dropdownVisibility} ${
            optionsPrepped.filter((f) => f.items !== undefined).length > 0
              ? "selectbox__dropdown--multilevel"
              : "selectbox__dropdown--singlelevel"
          }`}
        >
          <ul>
            {searchEnabled ? searchBar() : null}
            {optionsPrepped.map((option) => {
              let subitems = [];

              if (option.items !== undefined && option.items.length > 0) {
                subitems = option.items.map((subitem) => {
                  return (
                    <li key={`${subitem.id}${subitem.value}`}>
                      <button
                        id={subitem.value}
                        key={option.id}
                        onClick={() => handleClick(subitem)}
                      >
                        {subitem.name}
                      </button>
                    </li>
                  );
                });

                subitems = (
                  <ul className="selectbox__dropdown selectbox__dropdown__sub">
                    {subitems}
                  </ul>
                );

                return (
                  <li className="list-item--group">
                    <span id={option.id} key={option.id}>
                      {option.name}
                    </span>
                    <i className="fa fa-caret-right"></i>
                    {subitems}
                  </li>
                );
              } else {
                return (
                  <li key={option.name}>
                    <button
                      id={option.value}
                      onClick={() => handleClick(option)}
                    >
                      {option.value === "enable" ? (
                        <i className="te-enable-icon fa fa-circle"></i>
                      ) : option.value === "pause" ? (
                        <i className="te-pause-icon"></i>
                      ) : null}
                      {style?.includes("toggle-dropdown") &&
                      selectedOption?.value === option.value ? (
                        <i className="glyphicon glyphicon-ok trend_checked" />
                      ) : null}

                      {option.name}
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </SelectBox>
    </OnClickOutside>
  );
};

SingleSelectBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  children: PropTypes.node,
  selectedOption: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  onSelectChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  searchEnabled: PropTypes.bool,
  sortABC: PropTypes.bool,
  style: PropTypes.arrayOf(PropTypes.string),
  testId: PropTypes.string,
  isHidden: PropTypes.bool,
};

export default SingleSelectBox;
