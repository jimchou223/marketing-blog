import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import pageStyle from "../styles/Pagination.module.css";

let styles = {'backgroundColor': 'red'}

const PaginationUnit = (props) => {
  let countArray = new Array(props.pageNum).fill(0);

  return (
    <Pagination cssModule={pageStyle} aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink onClick={() => props.goTop()} first />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => props.goPrev()} previous />
      </PaginationItem>

      {countArray.map((el, index) => {
        return (
          <PaginationItem key={index} active={props.currentPage === index + 1}>
            <PaginationLink onClick={() => props.setPageFromChild(index + 1)}>{index + 1}</PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem>
        <PaginationLink onClick={() => props.goNext()} next />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink onClick={() => props.goLast()} last />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationUnit;
