/*
 * @Author: Vir
 * @Date: 2021-04-10 21:33:12
 * @Last Modified by: Vir
 * @Last Modified time: 2021-04-23 16:38:26
 */
import { ConnectStateType } from '@/models/connect';
import { Grid } from '@material-ui/core';
import React from 'react';
import { connect, ConnectProps, SiteListType } from 'umi';
import SiteDialog, { FormTypes, SiteDialogType } from './dialog';
import SiteCard from './siteCard';
import { useSnackbar } from 'notistack';
import './styles/index.less';

export interface TopSitesPropType extends ConnectProps {
  list: SiteListType[];
}

const TopSites: React.FC<TopSitesPropType> = ({ list, dispatch }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<SiteDialogType>('add');
  const [editValue, setEditValue] = React.useState({} as SiteListType);

  const addClick = () => {
    setType('add');
    setOpen(true);
  };

  const itemClick = (val: SiteListType) => {
    if (dispatch)
      dispatch({
        type: 'sites/addCount',
        payload: {
          id: val.id,
        },
      });
  };

  const onEdit = (value: SiteListType) => {
    setType('edit');
    setEditValue(value);
    setOpen(true);
  };

  const onRemove = (id: string) => {
    if (dispatch)
      dispatch({
        type: 'sites/del',
        payload: { id },
      }).then(() => {
        enqueueSnackbar('删除成功', { variant: 'success' });
      });
  };

  const dialogClose = () => {
    setOpen(false);
    setEditValue({ id: '', name: '', url: '', count: 0 });
  };

  const dialogSubmit = (val: FormTypes) => {
    if (dispatch)
      if (type === 'add') {
        dispatch({
          type: 'sites/add',
          payload: {
            item: val,
          },
        }).then(() => {
          enqueueSnackbar('添加成功', { variant: 'success' });
          setOpen(false);
        });
      } else if (type === 'edit') {
        dispatch({
          type: 'sites/edit',
          payload: {
            item: val,
          },
        }).then(() => {
          enqueueSnackbar('修改成功', { variant: 'success' });
          setOpen(false);
        });
      }
  };

  React.useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <>
      <Grid className="top-sites" container justify="center" spacing={2}>
        {list.map((i) => (
          <Grid item key={i.id}>
            <SiteCard
              item={i}
              onClick={() => itemClick(i)}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          </Grid>
        ))}
        <Grid item>
          <SiteCard type="add" onClick={addClick} />
        </Grid>
      </Grid>
      <SiteDialog
        open={open}
        type={type}
        value={editValue}
        onSubmit={dialogSubmit}
        onClose={dialogClose}
      />
    </>
  );
};

export default connect(({ sites }: ConnectStateType) => ({
  list: sites.list,
}))(TopSites);