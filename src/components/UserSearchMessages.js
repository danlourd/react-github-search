const UserSearchMessages = ({ searchText, hasResult, resultsLength}) => (
  <>
    <span className={`${resultsLength > 0 ? 'd-block' : 'd-none'} text-end mt-3`}>
      Showing Top 30
    </span>
    <span className={`${hasResult && resultsLength === 0 ? 'd-block' : 'd-none'} mt-3`}>
      {`We couldn’t find any repositories matching '${searchText}'`}
    </span>
  </>
);

export default UserSearchMessages;