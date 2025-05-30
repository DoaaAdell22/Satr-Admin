import { useEffect, useState } from "react";
import { Badge, Button, Spin, Table, Typography } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "utlis/library/helpers/axios";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { getPermissions } from "utlis/library/helpers/permissions";
import useQueryParams from "utlis/library/hooks/useQuery";
import { useQuery } from "@tanstack/react-query";
import RollerLoading from "components/loading/roller";
interface DataType {
  id: string;
  name: string;
  gender: string;
}

function MainTable({
  url,
  addURL,
  cols,
  refresher,
  importFile,
  config,
  defaultParams,

  ...rest
}: {
  url: string;
  addURL?: string;
  cols: any[];
  refresher?: boolean;
  config: any;
  importFile?:any;
  defaultParams?:{}

  [rest: string]: any;
}) {
  const navigate = useNavigate();
  const profile = useSelector(({ profile }) => profile.data);
  const token = useSelector(({ Auth }: { Auth: IAuth }) => Auth.idToken);

const [queryParams, setQueryParams] = useQueryParams(
  {
    pagination: {
      current: 1,
      pageSize: 10,
    },
  },
  {
    default: "overrideState",
  }
);
async function getData(query){
  const { pagination, filters , search , ...sorter } = query;
  // sorter => orderBy , orderType
  console.log(query)
  const params = {
    skip: (pagination.current - 1) * pagination.pageSize,
    take: pagination.pageSize,
    ...sorter , search,filters,
    ...defaultParams
  };

 return await axios
      .get(`/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
}
const { isPending, isError, data, error , refetch,isRefetching  ,isFetching}= useQuery({ queryKey: [url, queryParams , defaultParams],queryFn:()=> getData(queryParams)  ,   refetchInterval:3000})
useEffect(()=>{
  refetch()
},[refresher])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
  ) => {
    delete sorter.column;
    delete pagination.showSizeChanger;
    delete pagination.total;
    const params = {
    };  // filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]:[string , any[]]) => {
      if (key && value) {
        if (value.length === 2 && value[1] === "search") {
          // params["search"] = [key, value[0]];
          params["search"] = {
            ...params["search"],
            [key]: value[0],
          };
        } else {
          params["filter"] = {
            ...params?.["filter"],
            [key]: value,
          };
          // params["filtsers"][key] = value;
        }
      }
    });
  }
  console.log({sorter})
  // sort
  if (sorter?.field && sorter?.order) {
    if (typeof sorter.field == "string") {
      params["orderBy"] = sorter.field;
      params["orderType"] = sorter.order.substring(0, 4); //asce,desc
    }
  }
    setQueryParams({pagination , ...params});

  };
  const allCols = [
    {
      title: <FormattedMessage id="numbers" />,
      dataIndex: "id",
      key: "id",
      width: "65px",
      render: (text, record, index) => {
        return (
          <Typography.Text>
            {" "}
            {index +
              1 +
              (+queryParams.pagination.current - 1) *
               +queryParams.pagination.pageSize}{" "}
          </Typography.Text>
        );
      },
    },
    ...cols,
  ];
  // const SHOW_ADD = getPermissions(config.edit.add, "Add", profile)&& addURL 
  const SHOW_ADD =  addURL 
      const SHOW_IMPORT =
    importFile && getPermissions('files', 'import', profile);
  return (
    <div className="flex flex-col gap-4">
   
      <div className="flex justify-between">
        {SHOW_ADD && (
          <Button
            type="primary"
            onClick={() => {
              navigate(addURL);
            }}
            // icon={<IoMdAdd />}
          >
            <FormattedMessage id="add" />
          </Button>
        )}
        {SHOW_IMPORT && importFile}
      </div>

      <Badge.Ribbon
        className="mb-12 z-10"
        text={
          <div>
            <FormattedMessage id="count" />: {data?.data?.count}
          </div>
        }
        color="#3730a3"
      >

          <Table
          
          // className="custom-table"
          // rowClassName="custom-table-row"
            summary={() => <Table.Summary fixed={"top"}></Table.Summary>}
            sticky
            // tableLayout="fixed"
            // size="small"
            columns={allCols}
            rowKey={(record) => record.id}
            dataSource={data?.data?.data}
            // bordered
             scroll={{
            //   // y: `calc(100dvh - (${WRsAPER_MARGIN_TOP} + ${TOPBAR_HEIGHT} + ${TABLE_HEAD} + ${SHOW_ADD?ADD_BUTTON_WITH_GAP_TOP:'0px'} + ${TABLE_PAGINATION_HEIGHT} + ${TABLE_PAGINATION_MARGIN} + ${BREAD_CRUMBS_HEIGHT}))`,
              x: "max-content",
             }}
            pagination={{
              ...queryParams.pagination,
              current: +queryParams.pagination.current,
              pageSize: +queryParams.pagination.pageSize,
             total: data?.data?.count,
              showSizeChanger: true,
            }}
            loading={{spinning:isPending,
              indicator:<div className='!flex flex-col items-center relative'>
              <div className='drop-shadow-xl'>
              <img
      className="w-10 h-auto opacity-[.5]"
      src="/Logo-Satr.png"
      width={48}
      height={73}
      alt="masrad-admin"
    />
              </div>

            <Spin  className='dark:text-[burlywood] absolute inset-1/2 translate-y-[20px]'/>
            </div>
            }}
            onChange={handleTableChange}
            // locale={{
            //   emptyText: loading ? (
            //     <Skeleton active={true} paragraph={false} />
            //   ) : (
            //     <Empty />
            //   ),
            // }}
            {...rest}
          />
      </Badge.Ribbon> 
    </div>
  );
}
export default MainTable;
